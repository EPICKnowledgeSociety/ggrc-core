# Copyright (C) 2017 Google Inc.
# Licensed under http://www.apache.org/licenses/LICENSE-2.0 <see LICENSE file>

"""Module contains 'Task' model implementation."""
from ggrc import db


class Task(db.Model):
  """Contains 'Task' model implementation."""
  __tablename__ = 'tasks'